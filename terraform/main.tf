module "vpc" {
  source = "./modules/vpc"
}
module "ec2" {
  source         = "./modules/ec2"
  subnet1        = module.vpc.subnet1_id
  subnet2        = module.vpc.subnet2_id
  security_group = module.vpc.aws_security_group
}
