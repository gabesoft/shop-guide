require 'spec_helper'

describe ProductsController do

  # This should return the minimal set of attributes required to create a valid
  # Product. As you add validations to Product, be sure to
  # update the return value of this method accordingly.
  def valid_attributes
    { :name => 'prod x', :category => "food:dairy", :tags => "a b,c d e, f,g,h, k"}
  end

  def products_range count
    ( 1 .. count ).
      to_a.
      map { |n| Product.create! :name => "product#{n}", 
                                :category => "food:other",
                                :tags => (1 .. n).to_a.map { |x| "t#{x}" } }
  end

  def create_products
    values = [
      { :name => 'blue diamond', :category => "food", :tags => ['jewelery'] },
      { :name => 'cornflakes',   :category => "food", :tags => ['breakfast', 'food'] },
      { :name => 'milk',         :category => "food", :tags => ['dairy', 'food'] },
      { :name => 'shaving cream',:category => "food", :tags => ['beauty', 'health'] },
      { :name => 'shampoo',      :category => "food", :tags => ['beauty', 'health'] },
    ]
    values.each { |v| Product.create! v }
  end

  describe "GET index" do
    it "assigns all products as @products" do
      product = Product.create! valid_attributes
      get :index
      assigns(:products).should eq([product])
    end

    it "should filter products by name" do
        create_products
        get :index, :query => 'sh'
        products = assigns :products
        products.count.should eq 2
        products[0][:name].should eq 'shampoo'
        products[1][:name].should eq 'shaving cream'
    end
  end
  
  describe "GET hint" do
    it "should get only filtered names" do
      create_products
      get :hint, :query => 'sh', :format => :json
      items = JSON.parse(response.body)
      hints = items.map { |p| p[:name.to_s] }
      hints.should eq [ 'shampoo', 'shaving cream' ]
    end

    it "should get only the first ten matching names" do
      products_range 20
      get :hint, :name => 'prod', :format => :json
      JSON.parse(response.body).count.should eq 10
    end
  end

  describe "GET show" do
    it "assigns the requested product as @product" do
      product = Product.create! valid_attributes
      get :show, :id => product.slug
      assigns(:product).should eq(product)
    end
  end

  describe "GET new" do
    it "assigns a new product as @product" do
      get :new
      assigns(:product).should be_a_new(Product)
    end
  end

  describe "GET edit" do
    it "assigns the requested product as @product" do
      product = Product.create! valid_attributes
      get :edit, :id => product.slug
      assigns(:product).should eq(product)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Product" do
        expect {
          post :create, :product => valid_attributes
        }.to change(Product, :count).by(1)
      end

      it "assigns a newly created product as @product" do
        post :create, :product => valid_attributes
        assigns(:product).should be_a(Product)
        assigns(:product).should be_persisted
      end

      it "redirects to the created product" do
        post :create, :product => valid_attributes
        response.should redirect_to(Product.last)
      end

      it "should set the tags of the created product" do
        post :create, :product => valid_attributes
        assigns(:product).tags.should eq ["a b", "c d e", "f", "g", "h", "k"]
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved product as @product" do
        # Trigger the behavior that occurs when invalid params are submitted
        Product.any_instance.stub(:save).and_return(false)
        post :create, :product => {}
        assigns(:product).should be_a_new(Product)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        Product.any_instance.stub(:save).and_return(false)
        post :create, :product => {}
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested product" do
        product = Product.create! valid_attributes
        updated = {:name => 'milk', :category => "food:dairy:milk 1%", :tags => 'dairy, food'}
        expected = updated.clone
        expected[:tags] = ['dairy', 'food']
        Product.any_instance.should_receive(:update_attributes).with(expected)
        put :update, :id => product.slug, :product => updated
      end

      it "assigns the requested product as @product" do
        product = Product.create! valid_attributes
        put :update, :id => product.slug, :product => valid_attributes
        assigns(:product).should eq(product)
      end

      it "redirects to the product" do
        product = Product.create! valid_attributes
        put :update, :id => product.slug, :product => { :name => 'prod y', :category => product.category }
        response.should redirect_to(product)
      end
    end

    describe "with invalid params" do
      it "assigns the product as @product" do
        product = Product.create! valid_attributes
        Product.any_instance.stub(:save).and_return(false)
        put :update, :id => product.slug, :product => {}
        assigns(:product).should eq(product)
      end

      it "re-renders the 'edit' template" do
        product = Product.create! valid_attributes
        Product.any_instance.stub(:save).and_return(false)
        put :update, :id => product.slug, :product => {}
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested product" do
      product = Product.create! valid_attributes
      expect {
        delete :destroy, :id => product.slug
      }.to change(Product, :count).by(-1)
    end

    it "redirects to the products list" do
      product = Product.create! valid_attributes
      delete :destroy, :id => product.slug
      response.should redirect_to(products_url)
    end
  end

  describe "POST destroy_all" do
    it "should destroy all products" do
      products_range 10
      post :destroy_all 
      Product.all.count.should eq 0
    end
  end

  describe "POST import" do
    it "should import all products in file" do
      bulk_json = fixture_file_upload 'spec/files/products.json', 'application/json'
      post :import, :file => bulk_json
      Product.all.count.should eq 4
    end 
  end

  describe "POST export" do
    it "should return all products in json format" do
      products_range 10
      post :export, :format => :json
      body = JSON.parse response.body
      body.count.should eq 10
    end
  end
end
