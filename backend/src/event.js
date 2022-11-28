import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import * as dotenv from 'dotenv'
const router = express.Router();
import { ethers } from 'ethers'
import { connect, resultsToObjects, SUPPORTED_CHAINS } from '@tableland/sdk'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import { EventValidator } from './validator/index.js'
import axios from 'axios';
dotenv.config()

const polygonTestnet = SUPPORTED_CHAINS['polygon-mumbai']
let __dirname = path.resolve();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname))
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage: storage })


router.post("/", upload.single('image'), async (req, res, next) => {
    const { error, value } = EventValidator(req.body);
    if (error) return res.status(400).json({ statusCode: 400, error: error.details[0].message });
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
    const signer = wallet.connect(provider)
    const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })
    try {

        const uploadName = ["ImageGallery", req.file.originalname].join('|')

        const web3Storage = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN })
        console.log(`> 🤖 calculating content ID for ${req.file.originalname}`)

        const fileee = await getFilesFromPath(path.join(__dirname, `${req.file.originalname}`))

        const cid = await web3Storage.put(fileee, {
            name: uploadName,
            onRootCidReady: (localCid) => {
                console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
                console.log('> 📡 sending files to web3.storage ')
            }
        })

        const imageURI = `ipfs://${cid}/${req.file.originalname}`
      
        const createDocument = await tableLand.write(`INSERT INTO blockevents_80001_504 (id, eventName, eventType, category, eventDate, startTime, endTime, description, organizers, participantsNumber, ticketPrice, eventId, eventFile) 
        VALUES ('${value.eventName.toLowerCase()}', '${value.eventName}' , '${value.eventType}', '${value.category}', '${value.eventDate}', '${value.startTime}', '${value.endTime}', '${value.description}', '${value.organizers}', ${Number(value.participantsNumber)}, ${Number(value.ticketPrice)}, '${value.eventId}', '${imageURI}')`);
        
        /**upload and mint nft to address */
        const filestrean = fs.createReadStream(path.join(__dirname, `${req.file.originalname}`))
        
        let upload = await axios({
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": process.env.NFTPORT_KEY,
              },
              method: 'post',
              url: process.env.NFTPORT_MINTING_URL,
              params: {
                  chain: 'polygon', 
                  name: value.eventName, 
                  description: value.description, 
                  mint_to_address: value.address
            },
            data: {'file': filestrean}
        })
        console.log(upload)
        await fs.unlinkSync(path.join(__dirname, `${req.file.originalname}`))
        res.status(200).json({
            cid,
            imageURI,
            createDocument,
            transactionUrl: upload.data.transaction_external_url
        })

    }
    catch (e) {
        res.status(500).send({
            statusCode: 500,
            error: e.message
        })
    }
})


router.post('/table', upload.none(), async (req, res, next) => {
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const { name } = await tableLand.create(
            `eventName text, eventType text, category text, eventDate text, startTime text, endTime text, description text, organizers text, participantsNumber int, ticketPrice int, eventId text, eventFile text, id text, primary key(id)`,
            `blockevents`
        )
        return res.status(200).json({ statusode: 200, data: name })
    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})

router.get('/', async (req, res, next) => {
    try {
        let data = []
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const events = await tableLand.read(`SELECT * FROM  blockevents_80001_504`)

        const entries = resultsToObjects(events)

        for (const {
            eventName, eventType, category,
            eventDate, startTime, endTime, description, eventFile, organizers, participantsNumber, ticketPrice, id } of entries) {
            let structure = {
                'id': id,
                'eventName': eventName,
                'eventType': eventType,
                'category': category,
                'eventDate': eventDate,
                'startTime': startTime,
                'endTime': endTime,
                'description': description,
                'eventFile': eventFile,
                'organizers': organizers,
                'participantsNumber': participantsNumber,
                'ticketPrice': ticketPrice
            }
            data.push(structure)
        }

        res.status(200).json({
            statusCode: 200,
            message: "All events fetched",
            data: data
        })




    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})

router.get('/query', async (req, res, next) => {
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const events = await tableLand.read(`SELECT * FROM blockevents_80001_504 WHERE id='${req.query.id}'`)
        const entries = resultsToObjects(events)
        res.status(200).json({
            statusCode: 200,
            message: "Event fetched",
            data: entries
        })

    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})

router.post('/mint', upload.single('image'),  async(req,res,next) => {
    try{
        const filestrean = fs.createReadStream(path.join(__dirname, `${req.file.originalname}`))
        
        let upload = await axios({
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "6e65e278-66d4-4d6a-bc80-ad23d6a429f4",
              },
              method: 'post',
              url: "https://api.nftport.xyz/v0/mints/easy/files",
              params: {
                  chain: 'polygon', 
                  name: 'Blockevent', 
                  description: 'BlockEvent', 
                  mint_to_address: '0xF24c148d8390a32D25897EC70f2AD5dfdF186E17'
            },
            data: {'file': filestrean}
          })
          res.status(200).json({
            statusCode: 200,
            message: "",
            data: upload
        })

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})


export default router