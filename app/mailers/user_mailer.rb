class UserMailer < ApplicationMailer
    default from: 'no-reply@mail.com'

    def welcome_email(user)
        @user = user
        @url  = 'http://goodplays-aa.herokuapp.com/#/login'
        # all three of these file paths work. Sweet
        # attachments['relative.jpg'] = File.read('app/assets/images/capybara-swiming.jpg')
        # attachments['full.jpg'] = File.read('/Users/lylecrocodyle/Desktop/TLM/a:A/goodPlays/app/assets/images/capybara-swiming.jpg')
        attachments['rails_root.jpg'] = File.read("#{Rails.root}/app/assets/images/capybara-swiming.jpg")
        mail(to: @user.email, subject: "Welcome to goodPlays", cc: 'tlmcmerty3@gmail.com')
    end
end
