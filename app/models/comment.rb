class Comment < ActiveRecord::Base
  validates :suggestion, :body, :author, presence: true

  belongs_to :suggestion
  belongs_to :author, class_name: "User", foreign_key: "user_id"

  has_many :votes, as: :voteable, dependent: :destroy

  def vote_count
    upvotes = self.votes.where(upvote: true).length
    downvotes = self.votes.length - upvotes

    upvotes - downvotes
  end
end
