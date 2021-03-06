# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  # include ActiveModel::Validations
  # validates_with MyValidator

  validates :username, :password_digest, :session_token, :email, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validate :valid_email?
  validate :confirm_password?

  attr_reader :password, :confirm_password

  after_initialize :ensure_token

  has_many :game_racks
  has_many :games, through: :game_racks

  has_many :game_comments,
  class_name: :GameComment,
  foreign_key: :author_id

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

  def confirm_password=(confirm_password)
    @confirm_password = confirm_password
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

  private 

  def valid_email? 
    at_split = self.email.split('@')
    if at_split.length != 2
      errors.add(:email, 'is invalid') 
      return false
    end
    dotSplit = at_split[1].split('.')
    return dotSplit.length > 1 ? true : errors.add(:email, 'is invalid')
    false
  end

  def confirm_password?
    if self.password != self.confirm_password
      errors.add(:password, 'must match')
      return false
    end
    true
  end

end
