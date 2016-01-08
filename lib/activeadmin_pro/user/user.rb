ActiveAdmin.register User do
  permit_params :name, :email, :password

  filter :name
  filter :email

  index do
    selectable_column
    id_column
    column :name
    column :email
    actions
  end

  form do |f|
    inputs "#{t('activerecord.models.user', count: 1)} Details" do
      input :name
      input :email
      input :password if f.object.new_record?
    end
    actions
  end

  show do
    attributes_table do
      row :name
      row :email
      row :sign_in_count
      row :current_sign_in_at
      row :last_sign_in_at
      row :current_sign_in_ip
      row :last_sign_in_ip
      row :created_at
      row :updated_at
    end
    active_admin_comments
  end

  member_action :become, method: :post do
    sign_in(resource, bypass: true)
    redirect_to "/"
  end

  action_item :become_user, only: :show do
    # The path `become_admin_user_path` is confusing as
    # hell because we're not signing in as an admin user.
    # Here's what's up:
    #   The member action is: `become`
    #   The namespace is:     `admin`
    #   The controller is:    `user`
    link_to("Become User", become_admin_user_path(user), method: :post)
  end
end
