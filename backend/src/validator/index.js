import Joi from 'joi';

export const EventValidator = (event) => {
    const schema =Joi.object({
        eventName: Joi.string().required().label('Event Date'),
        eventType: Joi.string().required().label('Event Type'), 
        category: Joi.string().required().label('Category'), 
        eventDate: Joi.string().required().label('Event Date'),
        startTime: Joi.string().required().label('Start Time'), 
        endTime: Joi.string().required().label('End Time'),
        description: Joi.string().required().label('Description'),
        organizers: Joi.string().required().label('Organizers'),
        participantsNumber: Joi.number().required().label('Participants'),
        ticketPrice: Joi.number().required().label('Ticket price'),
        address: Joi.string().optional().label('Address')
    })
    const options = {
        errors: {
          wrap: {
            label: '',
          }
        }
    };
    return schema.validate(event, options)
}

