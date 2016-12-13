class Vote < ActiveRecord::Base
  validates :user, :suggestion, presence: true
  validates_inclusion_of :upvote, :in => [true, false]

  belongs_to :user
  belongs_to :suggestion
end
