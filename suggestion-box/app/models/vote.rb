class Vote < ActiveRecord::Base
  # CHANGE BELOW AFTER USER IMPLEMENTATION
  # validates :user, :suggestion, presence: true
  validates :suggestion, presence: true
  validates_inclusion_of :upvote, :in => [true, false]

  belongs_to :user
  belongs_to :suggestion
end
