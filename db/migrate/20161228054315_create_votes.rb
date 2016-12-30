class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.string :type, null: false
      t.integer :user_id, null: false
      t.integer :suggestion_id, null: false

      t.timestamps null: false
    end

    add_index :votes, :suggestion_id
    add_index :votes, :user_id
  end
end
