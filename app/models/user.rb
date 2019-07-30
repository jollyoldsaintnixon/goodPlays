class User < ApplicationRecord

  validates :username, :password_digest, :session_token, :email, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password

  after_initialize :ensure_token

  def self.find_by_credentials(username, password) 
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    return user
  end

  def self.generate_token()
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    bc = BCrypt::Password.new(self.password_digest)
    bc.is_password?(password)
  end
    
  def reset_token! #dangerous because of save!
    
    self.session_token = User.generate_token
    self.save!
    self.session_token
  end

  def ensure_token
    self.session_token ||= User.generate_token
  end
end
