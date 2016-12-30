class AddUserIdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :user_id, :integer
    change_column_null :comments, :user_id, false

    add_index :comments, :user_id
  end
end
