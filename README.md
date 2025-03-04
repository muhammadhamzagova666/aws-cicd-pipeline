# AWS CI/CD Pipeline - Todo List Application

> Fully automated integration and continuous deployment pipeline for web applications on AWS

## Overview

This project implements a complete CI/CD pipeline on AWS for a Todo List web application. It demonstrates how to automate the build and deployment process for both static websites hosted on S3 and dynamic Flask applications running in containers on ECS.

### Key Features
- Automated build and deployment pipeline using AWS CodeBuild
- Containerized Flask application with Docker and AWS ECS/ECR
- Static website hosting on AWS S3
- Source code management with Git and GitHub
- Infrastructure as Code (IaC) approach for AWS resources

### Target Audience
- DevOps engineers looking to implement AWS-based CI/CD pipelines
- Web developers seeking to automate deployment workflows
- Cloud architects designing scalable application infrastructures
- Students and professionals learning AWS services and modern deployment practices

### What Makes This Project Unique
This project bridges the gap between development and operations by providing a complete, working example of integrating multiple AWS services into a cohesive pipeline. Unlike theoretical examples, this implementation includes actual application code (Todo List) that makes the CI/CD concepts tangible and practical.

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python 3.9, Flask 2.3.2
- **Containerization**: Docker
- **CI/CD**: AWS CodeBuild
- **Cloud Services**:
  - AWS S3 (Static website hosting)
  - AWS ECR (Container registry)
  - AWS ECS (Container orchestration)
- **Version Control**: Git, GitHub
- **Web Server**: Nginx (for static content)

## Installation & Setup

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Git installed
- Docker installed (for local testing)
- Python 3.9 installed (for local development)

### Clone the Repository

```bash
git clone https://github.com/muhammadhamzagova666/aws-cicd-pipeline.git
cd aws-cicd-pipeline
```

### Local Development Setup

#### For the Static Website:
```bash
# Navigate to the static website directory
cd CodeBuild\ Static/

# You can use any simple HTTP server to test locally
# For Python:
python -m http.server 8000
```

#### For the Dynamic Flask Application:
```bash
# Navigate to the Flask app directory
cd CodeBuild\ Dynamic/

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask application
python app.py
```

## Usage Guide

### Local Testing

#### Static Todo List Application:
After starting your local server, navigate to `http://localhost:8000` in your browser to see the Todo List application. You can:
- Add new todo items
- Delete individual items
- Select multiple items with checkboxes and delete them together

#### Dynamic Flask Application:
After starting the Flask server, navigate to `http://localhost:5000` in your browser.

### AWS Deployment

The CI/CD pipeline automatically deploys your application when you push changes to the repository. The process includes:

1. CodeBuild picks up changes from the repository
2. Builds the application (compiles Python code or prepares static assets)
3. Creates Docker images for the dynamic application
4. Pushes images to ECR
5. Updates ECS services to use the new images
6. Updates static content on S3

## Project Structure

```
aws-cicd-pipeline/
├── CodeBuild Dynamic/          # Flask application with CodeBuild configuration
│   ├── app.py                  # Main Flask application file
│   ├── buildspec.yml           # AWS CodeBuild configuration
│   └── requirements.txt        # Python dependencies
│
├── CodeBuild Static/           # Static website with CodeBuild configuration
│   ├── buildspec.yml           # AWS CodeBuild configuration for static site
│   ├── index.html              # Main HTML file for the Todo List app
│   ├── ten.css                 # Stylesheet for the Todo List app
│   └── ten.js                  # JavaScript functionality for the Todo List app
│
├── documentation/              # Additional documentation
│   └── ...
│
└── README.md                   # This file
```

## Configuration & Environment Variables

### Required Environment Variables

For AWS CodeBuild:
- `AWS_REGION`: The AWS region to deploy to
- `ECR_REPOSITORY_URI`: URI of your ECR repository
- `ECS_CLUSTER`: Name of your ECS cluster
- `ECS_SERVICE`: Name of your ECS service
- `TASK_DEFINITION`: Path to your task definition file

Example `.env` file:
```
AWS_REGION=us-east-1
ECR_REPOSITORY_URI=123456789012.dkr.ecr.us-east-1.amazonaws.com/my-repo
ECS_CLUSTER=my-cluster
ECS_SERVICE=my-service
TASK_DEFINITION=task-definition.json
```

## Deployment Guide

### Setting Up AWS Resources

1. **Create an S3 Bucket for Static Hosting**
   ```bash
   aws s3 mb s3://my-todo-app-static-bucket
   aws s3 website s3://my-todo-app-static-bucket --index-document index.html
   ```

2. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name todo-app-dynamic
   ```

3. **Create ECS Cluster**
   ```bash
   aws ecs create-cluster --cluster-name todo-app-cluster
   ```

4. **Set Up CodeBuild Projects**
   - Create one CodeBuild project for the static website
   - Create another CodeBuild project for the dynamic Flask application
   - Configure both to use the respective buildspec.yml files

### CI/CD Pipeline Integration

1. Configure GitHub repository as the source for both CodeBuild projects
2. Set up webhooks to trigger builds on code push
3. Configure the appropriate IAM roles and policies for CodeBuild to access other AWS services

## Testing & Debugging

### Running Tests Locally

```bash
# For the Flask application
cd CodeBuild\ Dynamic/
python -m pytest

# For static files, you can use tools like lighthouse
lighthouse http://localhost:8000
```

### Common Issues and Solutions

- **CodeBuild Fails**: Check the CodeBuild logs for specific error messages
- **ECS Deployment Fails**: Verify your task definition and that the container can start properly
- **S3 Website Not Accessible**: Check bucket policies and public access settings

## Performance Optimization

- Enable S3 bucket caching for static assets with appropriate cache headers
- Implement AWS CloudFront for global content delivery
- Configure container resource allocation in ECS task definitions based on actual usage

## Security Best Practices

- Use IAM roles with least privilege access
- Implement S3 bucket policies to restrict access
- Enable encryption for S3 buckets
- Scan container images for vulnerabilities before deployment
- Use AWS Secrets Manager for sensitive information

## Contributing Guidelines

I welcome contributions to improve the AWS CI/CD Pipeline project!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Pull Request Guidelines

- Ensure code follows the project's style guidelines
- Update documentation as needed
- Add tests for new features
- Make sure all tests pass

## Documentation

- AWS services configuration
- Application architecture
- Detailed deployment workflows
- Troubleshooting guides

## Roadmap

- Implement automated testing in the CI/CD pipeline
- Add monitoring and alerting with AWS CloudWatch
- Create Infrastructure as Code templates (CloudFormation/Terraform)
- Add user authentication to the Todo List application
- Implement data persistence with AWS DynamoDB

## FAQ

**Q: Can I use this pipeline for other applications?**  
A: Yes, the pipeline can be adapted for other web applications by modifying the buildspec files.

**Q: How do I add custom domains to my deployed applications?**  
A: You can use AWS Route 53 and create A records pointing to your S3 website or Application Load Balancer.

**Q: How much does it cost to run this infrastructure on AWS?**  
A: Costs depend on usage but include charges for CodeBuild minutes, S3 storage/requests, ECR storage, and ECS compute resources.

## Acknowledgments & Credits

- Flask framework for the backend implementation
- AWS documentation for service integration guidance
- The open-source community for inspiration and best practices

## Contact Information

For questions, suggestions, or collaborations, please reach out:

- GitHub: [muhammadhamzagova666](https://github.com/muhammadhamzagova666)
- LinkedIn: [muhammadhamzagova666](https://www.linkedin.com/in/muhammadhamzagova666)
