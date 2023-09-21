import { useState } from "react"
import ContentHeader from "../../components/ContentHeader"
import { ModalCustom } from "../../components/ModalCustom"
import { FormRegister } from "./FormRegister"
import { Table } from "../../components/Table"
import { getAllUsers } from "../../services/Users"

export const Users = () => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal);
  const URL_API = 'https://jsonplaceholder.typicode.com/users'
  
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Surname',
      accessorKey: 'surname',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    /*{
      header: 'Actions',
      accessorKey: 'id',
      cell: (row: any) => <button>Editar {row.getValue()}</button>,
    },*/
  ]

  //const { data, error, loading } = getAllUsers('');

  return (
    <>
      <ContentHeader title="Users" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title"><i className="fas fa-user"></i> Users</h3>
                  <button className="btn btn-primary btn-sm float-right" onClick={toggleModal}>
                    <i className="fas fa-user-plus pr-1"></i> Agregar
                  </button>
                </div>
                <div className="card-body pad table-responsive">
                  <Table columns={columns} url={URL_API}/>
                </div>
              </div>
            </div>
            <ModalCustom title="Registro de usuarios" open={modal} handleClose={toggleModal}>
              <FormRegister/>
            </ModalCustom>
          </div>
        </div>
      </section>
    </>
  )
}