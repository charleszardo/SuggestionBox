class Vote < ActiveRecord::Base
  validates :user, :voteable, presence: true
  validates :voteable, presence: true
  validates_inclusion_of :upvote, :in => [true, false]

  belongs_to :user
  belongs_to :voteable, polymorphic: true
end
