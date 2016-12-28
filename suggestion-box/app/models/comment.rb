class Comment < ActiveRecord::Base
  validates :suggestion, :body, :author, presence: true

  belongs_to :suggestion
  belongs_to :author, class_name: "User", foreign_key: "user_id"
end
