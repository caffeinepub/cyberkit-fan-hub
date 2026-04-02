actor {
  type StoreInfo = {
    storeName : Text;
    tagline : Text;
  };

  let storeInfo : StoreInfo = {
    storeName = "IC Store";
    tagline = "Your one-stop shop for decentralized goods";
  };

  public query ({ caller }) func getStoreInfo() : async StoreInfo {
    storeInfo;
  };
};
