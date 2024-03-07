resource "aws_lambda_function" "post_confirmation" {
  function_name = "userPostConfirmation"
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  role          = aws_iam_role.lambda_exec_role.arn

  filename      = "path/to/your/deployment/package.zip"

  environment {
    variables = {
      APPLICATION_ENDPOINT = "https://your-application.com/api/users"
    }
  }
}

resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect = "Allow"
        Sid    = ""
      },
    ]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role = aws_iam_role.lambda_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "cognito-idp:AdminGetUser",
        ],
        Resource = "*"
        Effect   = "Allow"
      },
    ]
  })
}

resource "aws_cognito_user_pool" "my_pool" {
  lambda_config {
    post_confirmation = aws_lambda_function.post_confirmation.arn
  }
}
