class Suggestion < ActiveRecord::Base
  validates :author, presence: true

  validates :title, presence: true

  belongs_to :author, class_name: "User", foreign_key: :user_id

  has_many :comments, dependent: :destroy
  has_many :votes, as: :voteable, dependent: :destroy

  def vote_count
    upvotes = self.votes.where(upvote: true).length
    downvotes = self.votes.length - upvotes

    upvotes - downvotes
  end

  def author_username
    self.author.username
  end
end
