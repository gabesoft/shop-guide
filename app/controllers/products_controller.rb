class ProductsController < ApplicationController
  def index
    @products = Product.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @products }
    end
  end

  def show
    @product = Product.find_by_slug(params[:id])
    respond_to do |format|
      format.html
      format.xml  { render :xml => @product }
    end
  end

  def new
    @product = Product.new

    respond_to do |format|
      format.html
      format.xml  { render :xml => @product }
    end
  end

  def edit
    @product = Product.find_by_slug(params[:id])
  end

  def create
    @product = Product.new(
      :name => params[:product][:name],
      :tags => params[:product][:tags].nil? ? [] : params[:product][:tags].split(/, */)
    )

    respond_to do |format|
      if @product.save
        format.html { redirect_to(@product, :notice => 'Product was successfully created.') }
        format.xml  { render :xml => @product, :status => :created, :location => @product }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @product.errors, :status => :unprocessable_entity }
      end
    end
  end

  def update
    @product = Product.find_by_slug(params[:id])

    respond_to do |format|
      if @product.update_attributes(params[:product])
        format.html { redirect_to(@product, :notice => 'Product was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @product.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @product = Product.find_by_slug(params[:id])
    @product.destroy

    respond_to do |format|
      format.html { redirect_to(products_url) }
      format.xml  { head :ok }
    end
  end
  
  def destroy_all
    # TODO: delete products at the database level
    Product.all.each { |p| p.destroy }
    redirect_to products_url
  end
end
