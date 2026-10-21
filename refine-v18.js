/* Restore the photos supplied for Yechan and include them in his album. */
const yechanGalleryItemsV18=[
 ['yechan-photo-08','예찬이 셀카','10월 20일'],
 ['yechan-photo-09','예찬이 셀카','10월 20일'],
 ['yechan-photo-10','예찬이 셀카','10월 20일'],
 ['yechan-photo-11','예찬이 셀카','10월 20일'],
 ['yechan-photo-12','예찬이 셀카','10월 20일'],
 ['yechan-photo-13','예찬이 셀카','10월 20일'],
 ['yechan-photo-14','예찬이 셀카','10월 20일'],
 ['yechan-photo-15','예찬이 차 안에서','10월 20일'],
 ['yechan-photo-16','예찬이 사진','10월 20일'],
 ['yechan-photo-17','예찬이 사진','10월 20일'],
 ['yechan-photo-18','예찬이 사진','10월 20일']
];
const restoreGalleryV18=!readStore('gallery-restored-final-v20',false);
if(restoreGalleryV18||!editsV7.photos)for(const item of yechanGalleryItemsV18){if(!PHOTOS.some(p=>p[0]===item[0]))PHOTOS.push(item.slice())}
if(restoreGalleryV18){
 let album=albumsV9.find(a=>a.id==='yechan')||albumsV9.find(a=>a.name==='신예찬');
 if(!album){album={id:'yechan',name:'신예찬',photos:[]};albumsV9.push(album)}
 for(const key of ['yechan-call',...yechanGalleryItemsV18.map(p=>p[0])])if(!album.photos.includes(key))album.photos.push(key);
 if(editsV7.photos){editsV7.photos=PHOTOS;persistV7()}
 saveAlbumsV9();saveStore('gallery-restored-final-v20',true)
}
