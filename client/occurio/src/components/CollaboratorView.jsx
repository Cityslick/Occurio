import React, { Component } from 'react';

const CollaboratoView = (props) => {
  console.log(props.collaborator);
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.collaborator.fullname}</td>
      <td><input type="submit" value="Delete"
       onClick={
       		()=>{props.handlerDeleteCollaborator(props.collaborator.id,props.collaborator.userid)}
       	} /></td>
    </tr>
  )
}

export default CollaboratoView;


