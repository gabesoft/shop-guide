class ProductsController < ApplicationController
  before_filter :find_by_slug, :only => [ :show, :edit, :update, :destroy ]

  def index
    @products = Product.sort(:name).limit(100).all
    @product_count = Product.count

    respond_to do |format|
      format.html
      format.xml  { render :xml => @products }
      format.json  { render :json => @products }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.xml  { render :xml => @product }
      format.json  { render :json => @product }
    end
  end

  def new
    @product = Product.new

    respond_to do |format|
      format.html
      format.xml  { render :xml => @product }
      format.json  { render :json => @product }
    end
  end

  def edit
  end

  def create
    @product = Product.new(:name => product_name, :category => product_category, :tags => product_tags)

    respond_to do |format|
      if @product.save
        format.html { redirect_to(@product, :notice => 'Product was successfully created.') }
        format.xml  { render :xml => @product, :status => :created, :location => @product }
        format.json { render :json => @product.to_json, :status => :created, :location => @product }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @product.errors, :status => :unprocessable_entity }
        format.json  { render :json => @product.errors, :status => :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @product.update_attributes(:name => product_name, :category => product_category, :tags => product_tags)
        format.html { redirect_to(@product, :notice => 'Product was successfully updated.') }
        format.xml  { head :ok }
        format.json  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @product.errors, :status => :unprocessable_entity }
        format.json  { render :json => @product.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @product.destroy

    respond_to do |format|
      format.html { redirect_to(products_url) }
      format.xml  { head :ok }
      format.json  { head :ok }
    end
  end

  def destroy_all
    # TODO: delete products at the database level
    Product.all.each { |p| p.destroy }
    redirect_to products_url
  end

  def export
    respond_to do |format|
      format.json { render :json => Product.all }
      format.all { render :text => "only JSON format is supported" }
    end
  end

  def import
    file = params[:file]
    if !file.nil?
      products = JSON.parse(file.read)
      products.each { |p| Product.create! p }
    end
    redirect_to products_url
  end

  private

  def find_by_slug
    @product = Product.find_by_slug(params[:id])
  end

  def product_name
    params[:product][:name]
  end

  def product_tags
    params[:product][:tags].nil? ? [] : params[:product][:tags].split(/, */)
  end

  def product_category
    params[:product][:category]
  end
end
