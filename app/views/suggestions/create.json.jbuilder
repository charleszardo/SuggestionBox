json.(@suggestion, :id, :title, :body, :created_at, :updated_at, :user_id, :vote_count, :author_username)

json.comments @suggestion.comments, :id, :suggestion_id, :body, :created_at, :updated_at, :user_id, :vote_count
