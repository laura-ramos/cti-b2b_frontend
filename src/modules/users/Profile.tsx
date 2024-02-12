import { PfButton } from "@profabric/react-components";
import ContentHeader from "../../components/ContentHeader"
import { useTranslation } from "react-i18next";
import { FormRegister } from "./FormRegister";
import { useState } from "react";
import { FileUpload } from "../../components/FileUpload";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { t, i18n } = useTranslation()
  const authentication = useSelector((state: any) => state.auth.authentication);

  return (
    <>
      <ContentHeader title="Profile" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                
                <div className="card-body box-profile">
                  <div className="img-user">
                    <FileUpload file=''/>
                  </div>
                  <h3 className="profile-username text-center">
                  {authentication.profile.login}
                  </h3>
                  <p className="text-muted text-center">Software Engineer</p>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>{t<string>('header.user.followers')}</b>

                      <span className="float-right">1,322</span>
                    </li>
                    <li className="list-group-item">
                      <b>{t<string>('views.user.following')}</b>
                      <span className="float-right">543</span>
                    </li>
                    <li className="list-group-item">
                      <b>{t<string>('header.user.friends')}</b>
                      <span className="float-right">13,287</span>
                    </li>
                  </ul>
                  <PfButton block>
                    {/* @ts-ignore */}
                    {t<string>('main.label.follow')}
                  </PfButton>
                </div>
                {/* /.card-body */}
              </div>
            </div>
            <div className="col-md-9">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  Usuario
                </div>
                <div className="card-body">
                  <FormRegister isAddMode={false} idUser={1}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}