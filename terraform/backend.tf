terraform {
  backend "s3" {
    region         = "us-east-1"
    key            = "426857564226/beanstalk.tfstate"
    bucket         = "krishna-s3-bucket9"
    encrypt        = true
  }
}