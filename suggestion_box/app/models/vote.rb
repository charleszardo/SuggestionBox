class Vote < ActiveRecord::Base
  validates :type, :user, :suggestion, presence: true
end
