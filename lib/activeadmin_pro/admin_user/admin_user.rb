ActiveAdmin.register AdminUser do
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
    inputs "Admin User Details" do
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

  member_action :sign_in_as, method: :get do
    sign_in(resource, bypass: true)
    redirect_to "/"
  end

  action_item :become_user, only: :show do
    # The path `sign_in_as_admin_admin_user_path` looks confusing as hell.
    # Here's what's up:
    #   The member action is: `sign_in_as`
    #   The namespace is:     `admin`
    #   The controller is:    `admin_user`
    link_to("Become User", sign_in_as_admin_admin_user_path(admin_user))
  end
end
