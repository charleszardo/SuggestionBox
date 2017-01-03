class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password_digest, presence: { message: "Password can't be blank"}

  attr_reader :password

  has_many :sessions, dependent: :destroy
  has_many :suggestions, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :votes, dependent: :destroy

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)

    !user.nil? && user.is_password?(password) ? user : nil
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

  def is_owner?(type, item)
    self.send("#{type}s").include?(item)
  end
end
