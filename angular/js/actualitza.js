db.ref('dades/0').update({
  Nom:'Xisco Truyols',Punts:100 
})
.then(() => {
  // Update successful!
  console.log('Data updated successfully!');
})
.catch((error) => {
  // Handle errors
  console.error('Error updating data:', error);
});
