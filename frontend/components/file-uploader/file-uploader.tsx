import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./file-uploader.module.scss";

export const FileUploader: FC<FileUploaderProps> = (
  props: FileUploaderProps
) => {
  const { onChange } = props;

  const [files, setFiles] = useState<File[] | undefined>(undefined);

  useEffect(() => {
    onChange(files);
  }, [onChange, files]);

  const onDropHandler = useCallback((acceptedFiles: File[]) => {
    if (Array.isArray(acceptedFiles) && acceptedFiles.length > 0) {
      setFiles((prev: File[] | undefined) => {
        if (!prev) return [...acceptedFiles];
        return [...prev, ...acceptedFiles];
      });
    }
  }, []);

  const { getRootProps, getInputProps, fileRejections, open, isDragActive } =
    useDropzone({
      onDrop: onDropHandler,
      noClick: true,
      noKeyboard: true,
      accept: {
        "image/*": [".jpeg", ".png"],
      },
    });

  const deleteHandler = (index: number) => {
    setFiles((prev: File[] | undefined) => {
      if (!prev) return;
      return prev?.filter((_, i) => i !== index);
    });
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag 'n' drop some file here, or click to select file</p>
          )}
          {fileRejections && fileRejections.length !== 0 && (
            <p>Only image file will be accepted</p>
          )}
          <button disabled={isDragActive} onClick={() => open()}>
            Select File
          </button>
          {files && files?.length !== 0 && (
            <div>
              {files.map((file: File, index: number) => (
                <div>
                  <img
                    width="100%"
                    height={240}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                  <p> {file.name}</p>
                  <p> {`${(file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
                  <button onClick={() => deleteHandler(index)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

interface FileUploaderProps {
  onChange: (files: File[] | undefined) => void;
}
