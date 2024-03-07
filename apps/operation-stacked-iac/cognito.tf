provider "aws" {
  region = "eu-west-2"
}

resource "aws_cognito_user_pool" "operation-stacked-user-pool" {
  name = "my_user_pool"

  auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_client" "operation-stacked-user-pool_client" {
  name         = "my_pool_client"
  user_pool_id = aws_cognito_user_pool.my_pool.id

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["phone", "email", "openid", "profile", "aws.cognito.signin.user.admin"]
  callback_urls                        = ["https://yourapp.com/callback", "http://localhost:3000/"]
  logout_urls                          = ["https://yourapp.com/logout", "http://localhost:3000/"]

  generate_secret = true

  explicit_auth_flows = ["ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH", "ALLOW_CUSTOM_AUTH"]
}

resource "aws_cognito_user_pool_domain" "operation-stacked-user-pool_domain" {
  domain       = "operation-stacked-user-pool"
  user_pool_id = aws_cognito_user_pool.my_pool.id
}

resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.my_pool.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    client_id     = var.google_client_id
    client_secret = var.google_client_secret
    authorize_scopes = "openid profile email"
  }

  attribute_mapping = {
    email = "email"
    name  = "name"
  }

  idp_identifiers = ["Google"]
}

resource "aws_cognito_user_pool_domain" "my_pool_domain" {
  domain       = "auth.operationstacked.com"
  user_pool_id = aws_cognito_user_pool.operation.id

  certificate_arn = aws_acm_certificate.my_cert.arn
}

# Example of referencing an existing ACM certificate by ARN
data "aws_acm_certificate" "my_cert" {
  domain   = "auth.myapp.com"
  statuses = ["ISSUED"]
}

