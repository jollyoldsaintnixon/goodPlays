# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

# Add sendgrid support
if Rails.env.production?
  ActionMailer::Base.smtp_settings = {
    :user_name => ENV['SENDGRID_USERNAME'],
    :password => ENV['SENDGRID_PASSWORD'],
    :domain => "www.goodplays-aa.herokuapp.com",
    :address => "smtp.sendgrid.net",
    :port => 587, # sendgrid_port
    :authentication => :plain,
    :enable_starttls_auto => true
  }
end