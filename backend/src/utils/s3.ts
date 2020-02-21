const FILE_UPLOAD_S3_BUCKET = process.env.FILE_UPLOAD_S3_BUCKET

export function recoverS3AttachmentURL(todoId: string) : string{
    return `https://${FILE_UPLOAD_S3_BUCKET}.s3.us-east-1.amazonaws.com/${todoId}`
}