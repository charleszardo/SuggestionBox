class Session < ActiveRecord::Base
  validates :session_token, :user_id, presence: true
  validates :session_token, uniqueness: true

  belongs_to :user

  def self.generate_session_token
    SecureRandom::base64(16)
  end
end
