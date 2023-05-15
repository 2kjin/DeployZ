package org.a402.deployz.global.aws;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Base64;
import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class S3Service {
    private final AmazonS3Client amazonS3Client;

    @Value("$cloud.aws.s3.bucket")
    private String bucket;

    public S3Service(final AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    public String uploadImage(String rawBase64EncodedStringImage, String fileName) {
        // data format : data:image/jpeg;base64, 뒤에 base64인코딩 데이터
        final String[] splitBase64 = rawBase64EncodedStringImage.split(",");
        final String base64EncodedImage = splitBase64[1];
        final String imageInfoData = splitBase64[0];
        final String[] imageInfoDataSplit = imageInfoData.split("/");
        final String imageExtension = imageInfoDataSplit[1].split(";")[0];
        final String dataType = imageInfoDataSplit[0].split(":")[1];

        if (!dataType.equals("image")) {
            throw new GlobalBaseException(GlobalErrorCode.INVALID_DATA_TYPE);
        }

        byte[] decode = Base64.getDecoder().decode(base64EncodedImage);
        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(decode)) {
            final String s3UploadedImageFileName = fileName + "." + imageExtension;
            amazonS3Client.putObject(new PutObjectRequest(bucket, s3UploadedImageFileName, inputStream, null));

            return amazonS3Client.getUrl(bucket, s3UploadedImageFileName).toString();
        } catch (IOException e) {
            throw new RuntimeException("이미지 업로드 실패");
        }
    }

    public void deleteImage(String prevImageUrl) {
        amazonS3Client.deleteObject(bucket, prevImageUrl);
    }
}
