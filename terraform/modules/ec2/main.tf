

# Define the IAM Role with Trust Relationship
resource "aws_iam_role" "ssm" {
  name = "ec2_role_ssm"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# Attach the AmazonSSMFullAccess policy to the IAM Role
data "aws_iam_policy" "aws_managed_policy" {
  arn = "arn:aws:iam::aws:policy/AmazonSSMFullAccess"
}

resource "aws_iam_role_policy_attachment" "role_policy_attachment" {
  role       = aws_iam_role.ssm.name
  policy_arn = data.aws_iam_policy.aws_managed_policy.arn
}

resource "aws_iam_role_policy_attachment" "role_policy_attachment2" {
  role       = aws_iam_role.ssm.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

# Create an IAM Instance Profile
resource "aws_iam_instance_profile" "ssm_ec2" {
  name = "ec2_role_ssm"
  role = aws_iam_role.ssm.name
}

# EC2 Instance with IAM Instance Profile
resource "aws_instance" "krishna" {
  ami                         = "ami-0c7217cdde317cfec"
  instance_type               = var.size
  subnet_id                   = var.subnet1
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.security_group]
  iam_instance_profile        = aws_iam_instance_profile.ssm_ec2.name

  root_block_device {
    volume_size = 8
    volume_type = "gp3"
  }

  tags = {
    Name = "KrishnaInstance"
  }
}

# Allocate an Elastic IP
resource "aws_eip" "krishna_eip" {
  vpc = true
}

# Associate the Elastic IP with the EC2 Instance
resource "aws_eip_association" "krishna_eip_assoc" {
  instance_id   = aws_instance.krishna.id
  allocation_id = aws_eip.krishna_eip.id
}