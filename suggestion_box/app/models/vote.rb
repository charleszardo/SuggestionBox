class Vote < ActiveRecord::Base
  validates :upvote, :user, :suggestion, presence: true

  belongs_to :user
  belongs_to :suggestion
end
