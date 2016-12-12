class Suggestion < ActiveRecord::Base
  validates :title, :author, presence: true

  belongs_to :author, class_name: "User", foreign_key: "user_id"
end
