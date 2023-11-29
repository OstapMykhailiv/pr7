terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.27.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "AKIAUKSEOJTUAEBH6XHB"
  secret_key = "N5xE68DR9mouY+gfdY+iYb9EZGq4bVAfsAn+45Yr"
}

resource "aws_security_group" "example_security_group" {
  name        = "example_security_group"
  description = "Allow inbound traffic on port 5000"

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "example_server" {
  ami           = "ami-0230bd60aa48260c6"
  instance_type = "t2.micro"

  vpc_security_group_ids = [aws_security_group.example_security_group.id]

  tags = {
    Name = "Server"
  }
  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install -y docker
              sudo service docker start
              sudo usermod -aG docker ec2-user
              sudo yum install -y git
              EOF
}
