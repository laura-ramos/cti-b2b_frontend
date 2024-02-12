import { useMemo, useState } from "react"
import ContentHeader from "../../components/ContentHeader"
import { ModalCustom } from "../../components/ModalCustom"
import { FormRegister } from "./FormRegister"
import { Table } from "../../components/Table"
import { ActionButton } from "../../components/ActionButton"

export const Users = () => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal);
  const URL_API = 'https://nvi-admanager.docksal.site/api/user2'
  const [idUser, setIdUser] = useState(0)
  const [isAddMode, setIsAddMode] = useState(true)

  // define table columns to show
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'User',
      accessorKey: 'login',
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
    {
      header: 'Photo',
      accessorKey: 'photo',
      enableSorting: false,
      enableColumnFilter: false,
      cell: (data: any) => (
        <img src={data.getValue() ?? '/img/user.png'} className="img-fluid rounded-circle" width='50px' />
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'status',
      enableSorting: false,
      enableColumnFilter: false,
      cell: (cell: any) => (
        <div className="btn-group btn-group-sm text-center">
          <button className="btn btn-sm btn-warning" onClick={() => editUser(cell.row.original.id)}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className={`btn btn-sm btn-danger ${cell.getValue() ? '' : 'disabled'}`} onClick={() => deleteUser(cell.row.original.id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ),
    },
  ]

  // open form to edit user by id 
  const editUser = (id: number) => {
    setModal(!modal)
    setIsAddMode(false)
    setIdUser(id)
  }

  // delete user
  const deleteUser = (id: number) => {
    //call service to desactivate user
  }
  // open form to create new users
  const createUser = () => {
    setIsAddMode(true)
    setModal(!modal)
    setIdUser(0)
  }
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
                  <button className="btn btn-primary btn-sm float-right" onClick={createUser}>
                    <i className="fas fa-user-plus pr-1"></i> Agregar
                  </button>
                </div>
                <div className="card-body table-responsive">
                  <Table columns={columns} url={URL_API}/>
                </div>
              </div>
            </div>

            <ModalCustom title={isAddMode ? "Registro de usuarios" : "Editar usuario"} open={modal} handleClose={toggleModal}>
              <FormRegister isAddMode={isAddMode} idUser={idUser}/>
            </ModalCustom>
          </div>
        </div>
      </section>
    </>
  )
}