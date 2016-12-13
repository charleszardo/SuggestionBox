class Vote < ActiveRecord::Base
  validates :type, :user, :suggestion, presence: true

  belongs_to :user
  belongs_to :sugge
end
