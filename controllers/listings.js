const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
  console.log("geometry:", listing.geometry); 
  if(!listing){
    req.flash("error","Cannot find the listing");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res,next) => {
let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
}).send();

 const newListing = new Listing(req.body.listing);
 newListing.owner = req.user._id;
 newListing.image = { url: req.file.path, filename: req.file.filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success","Successfully made a new listing");
  res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Cannot find the listing");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/,w_2560/");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(req.file){
    listing.image = { url: req.file.secure_url, filename: req.file.filename };
    await listing.save();
  }
  req.flash("success","Successfully updated the listing");
  res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Successfully deleted the listing");
  res.redirect("/listings");
}
