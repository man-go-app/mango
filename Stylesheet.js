import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

//PADDING
var paddingXXSmall = 2;
var paddingXSmall = 4;
var paddingSmall = 8;
var paddingStandard = 16;
var paddingBig = 24;
var paddingAdjustHeader = 70;

//MARGIN
var MarginXXSmall = 2;
var MarginXSmall = 4;
var MarginSmall = 8;
var MarginStandard = 16;

//DIMENSIONS
var ElementHeightSmall = 24;
var ElementHeightStandard = 32;
var ElementHeightMedium = 40;
var ElementHeightBig = 48;
var ElementHeaderHeight = 70;

//FONT SIZE
var TextSizeXBig = 64;
var TextSizeBig = 40;
var TextSizeMedium = 32;
var TextSizeEmphasis = 24;
var TextSizeStandard = 16;
var TextSizeSmall = 12;


//COLORS
var ColorActionBlue = '#007aff';
var ColorActionWhite = '#f2f4f4';

module.exports = StyleSheet.create(
{
  /*==== CONTAINER ===*/
  container:{
    margin: 0,
    padding: 0,
    height: '100%',
    flex:1,
    backgroundColor: 'white'
  },
  containerPaddingTop:{
    margin: 0,
    padding:0,
    paddingTop: paddingAdjustHeader,

    height: '100%',

    flex:1,
  },

  containerPadding: {
    margin: 0,
    padding: paddingStandard,
    backgroundColor: 'white'
  },

  /*==== TEXT ====*/
  h1: {
    padding: paddingSmall,
    paddingTop: paddingSmall,
    paddingBottom: paddingSmall,

    fontSize: TextSizeXBig,
    fontWeight: 'bold'
  },
  h2:{
    padding: paddingSmall,
    paddingTop: paddingSmall,
    paddingBottom: paddingSmall,

    fontSize: TextSizeBig,
    fontWeight: '800',
  },
  h2Narrow: {
    padding: 0,
    margin: 0,
    paddingTop: paddingSmall,
    paddingBottom: paddingSmall,

    fontSize: TextSizeBig,
    fontWeight: '800',
  },

  h3: {
    padding: paddingSmall,
    paddingTop: paddingXXSmall,
    paddingBottom: paddingXXSmall,
    fontSize: TextSizeMedium,
    fontWeight: '800',
    color: '#2f4f4f',
    width: '100%',
    alignSelf: 'center',
    textAlign: 'left'
  },
  h4: {
    padding: 0,
    paddingTop: paddingStandard,
    paddingBottom: paddingSmall,
    fontSize: TextSizeEmphasis,
    fontWeight: '800'
  },
  BodyText:{
    padding: paddingSmall,
    paddingTop: paddingSmall,
    paddingBottom: paddingSmall,

    fontSize: TextSizeStandard,
  },
  BodyTextNarrow: {
    padding: 0,
    paddingTop: paddingSmall,
    paddingBottom: paddingStandard,

    fontSize: TextSizeStandard,
  },

  ServicesListTitle: {
    marginLeft: MarginSmall,
    fontSize: TextSizeStandard,
    fontWeight: '600',
    color: 'black'
  },

  ServicesListSubtitle:{
    marginLeft: MarginSmall,
    marginTop: 0,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: TextSizeStandard,
  },

  ProfileHeaderName: {
    padding: 0,
    fontSize: TextSizeEmphasis,
    fontWeight: '600',
  },

  ProfileSummary: {
    padding: paddingSmall,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: TextSizeStandard, /*was 20*/
    fontWeight: '600',
  },

  map: {
    height: '100%',
    width: '100%',
  },
  inlineMap: {
    height: 200,
    margin: MarginXXSmall,
    borderRadius: 8
  },

  inlineMapButton: {
    margin: MarginStandard,
    height: ElementHeightBig,
    width: ElementHeightBig,
    borderRadius: ElementHeightBig/2,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: ColorActionBlue,
    borderWidth: 1,
    borderColor: 'white'
  },
  inlineMapButtonSmall: {
    margin: MarginXXSmall,
    height: ElementHeightStandard,
    width: ElementHeightStandard,
    borderRadius: ElementHeightStandard/2,
  },
  inlineMapButtonSmallMain: {
    margin: MarginXXSmall,
    height: ElementHeightStandard,
    width: ElementHeightStandard,
    borderRadius: ElementHeightStandard/2,
    backgroundColor: ColorActionBlue,
    borderWidth: 1,
    borderColor: 'white'
  },
  inlineMapInputCont: {
    marginTop: MarginXSmall,
    marginBottom: MarginXSmall,
    marginLeft: MarginXXSmall,
    marginRight: MarginXXSmall,
    padding: paddingXXSmall,
    minHeight: ElementHeightBig,
    borderRadius: ElementHeightBig/4,
    backgroundColor: ColorActionWhite,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },
  inlineMapInput: {
    flexGrow: 1,
    minHeight: ElementHeightStandard,
    fontSize: TextSizeStandard,
    margin: MarginXXSmall,
    padding: paddingXSmall
  },

  /*==== SLIDE UP =====*/
  SlideUp: {
    margin: 0,
    //padding: paddingStandard,
    borderTopWidth: 1,
    borderTopColor: '#dedede',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: Dimensions.get('window').height-88, //88+16*2
    backgroundColor: 'white'
  },

  SlideUpHeader: {
    padding: paddingStandard,
    margin: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: ElementHeightBig + 2*paddingStandard, /*was 68*/ /*48+2*8*/
    flexDirection: 'row',
    //borderBottomWidth: 1,
    backgroundColor: ColorActionWhite
  },

  //Total Height 72

  SlideUpButton: {
    padding: 0,
    margin: MarginXSmall,
    height: ElementHeightMedium,
    width: ElementHeightMedium,
    //backgroundColor: ColorActionWhite,
    backgroundColor: 'white', 
    borderRadius: 20,
  },
  SlideUpHeading: {
    padding: 0,
    margin: MarginXSmall,
    height: ElementHeightMedium,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },

  SlideUpHeadingTitle:{
    fontWeight: "600",
    fontSize: TextSizeMedium,
    flexGrow: 1,
    //height: ElementHeightStandard,

  },

  SlideUpHeadingIcon:{
    margin: MarginXSmall,
    height: ElementHeightStandard,
    width: ElementHeightStandard,
  },

  CategoryButton: {
    margin: 0,
    padding: 0,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },

  WorkersList:{
    marginTop: 0,
    padding: 0,
    paddingBottom: paddingAdjustHeader, /*was marginBottom*/
    borderTopWidth: 0,
  },


/* ==== LIST ITEMS ====*/

  ListItemContainer: {
    padding: paddingSmall,
    //paddingTop: paddingSmall, paddingBottom: paddingSmall, paddingRight: 0
  },

  ListItemContainerNarrow: {
    padding: paddingSmall,
    paddingTop: paddingXSmall,
    paddingBottom: paddingXSmall
    //padding: 0, paddingTop: paddingXSmall, paddingBottom: paddingXSmall, paddingRight: 0, borderTopWidth: 0
  },

  ListItemContainerFloat: {
    padding: 0, paddingTop: paddingSmall, paddingBottom: paddingSmall, paddingRight: 0, borderBottomWidth: 0
  },

  ListItemContainerFloatNarrow: {
    padding: 0, paddingTop: paddingXSmall, paddingBottom: paddingXSmall, paddingRight: 0, borderBottomWidth: 0
  },

  ListItemWrapperAction: {
    padding: paddingXSmall,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: ColorActionWhite,
    borderRadius: 8,
  },
  ListItemWrapperActionTransparent: {
    padding: paddingXSmall,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 8,
  },

  ListItemWrapperActionSelected: {
    padding: paddingXSmall,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#c4e0ff',
    borderRadius: 8,
  },

  WorkerProfileListItem:{
    padding: paddingXSmall,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    borderTopWidth: 0,
    alignItems: 'center',
  },

  CategoryCont:{
    padding: paddingSmall,
    paddingTop: paddingAdjustHeader,
    paddingBottom: paddingAdjustHeader,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#dedede',
    alignContent: 'center'
  },

  CategoryCircle: {
    margin: MarginStandard,

    borderRadius: 40,

    width: 80,
    height: 80,

    backgroundColor: '#f5f5f5',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },





  WorkerProfileDesc:{
    marginLeft: MarginSmall,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },



  WorkerProfileDescCat: {
    //marginRight: 10,
    fontWeight: '300',
    fontSize: TextSizeStandard,
    color: '#2f4f4f',
  },
  WorkerProfileDescCatFull: {
    //marginRight: 10,
    flex: 0,
    flexGrow: 1,
    width: '100%',
    fontSize: TextSizeStandard,
    fontWeight: '600',
    color: '#2f4f4f',
  },

  ProfileHeader: {
    padding: paddingStandard,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },

  ProfileHeaderPic: {
    margin: MarginXSmall
  },

  ProfileHeaderInfo: {
    padding: paddingSmall,
    flexShrink: 1,
    flexDirection: 'column',
  },


  ProfileHeaderCategory: {
    padding: paddingXXSmall,
    paddingLeft: paddingSmall,
    paddingRight: paddingSmall,
    marginTop: MarginXSmall,
    marginBottom: MarginXSmall,
    fontSize: TextSizeStandard,
    backgroundColor: ColorActionWhite,
    borderRadius: 10
  },
  ProfileInfo:{
    padding: paddingSmall,
    paddingTop: paddingXSmall,
    paddingBottom: paddingXSmall,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProfileInfoButton:{
    margin: 0,
    marginRight: 0,

    height: ElementHeightStandard,

    padding: paddingXSmall,
  },



  ServicesList: {
    marginTop: 0,

    borderTopWidth: 0,
    borderBottomWidth: 0
  },

  ProfileSection: {
    padding: paddingStandard,

    borderBottomWidth: 1,
    borderBottomColor: '#dedede',

    backgroundColor: 'white'
  },

  listButton: {
    //margin: MarginXSmall,
    padding: paddingSmall,
    borderRadius: 8,
    height: ElementHeightMedium, /*was 40*/

    backgroundColor: 'rgb(0,122,255)',
    width: '100%'
  },

  headerButton:{
    padding: paddingSmall,
    margin: MarginXSmall,

    borderRadius: 20,

    height: ElementHeightStandard,

    backgroundColor: 'rgb(0,122,255)'
  },

  ButtonFullWidthBottom: {
    marginTop: MarginSmall,
    marginBottom: MarginSmall,
    marginLeft: 0,
    marginRight: 0,
    height: ElementHeightMedium,
    position: 'relative',
    bottom: 0,
    width: '100%',
  },
  inputStandard: {
    margin: MarginSmall,
    fontSize: TextSizeStandard,
    fontWeight: '400',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede'
  },
  inputStandardNoMargin: {
    marginTop: MarginSmall,
    marginBottom: MarginSmall,
    marginLeft: 0,
    marginRight: 0,
    fontSize: TextSizeStandard,
    fontWeight: '400',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede'
  }
})
