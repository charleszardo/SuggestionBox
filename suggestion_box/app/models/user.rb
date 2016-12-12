class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password_digest, presence: { message: "Password can't be blank"}

  attr_reader :password

  has_many :sessions

  def self.find_by_credentials(creds_hash)
    user = User.find_by_username(creds[:username])

    !user.nil? && user.is_password?(creds[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password_digest
    BCrypt::Password.new(super)
  end
end
