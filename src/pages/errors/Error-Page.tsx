import { useRouteError } from "react-router-dom"
import { Link } from 'react-router-dom';

import ContentHeader from '../../components/ContentHeader'
import { setWindowClass } from '../../utils/helpers'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Add AdminLTE CSS classNamees to Body tag
  setWindowClass('hold-transition sidebar-mini');

  return (
    <div>
      <ContentHeader title="500 Error Page" />
      <section className="content">
        <div className="error-page">
          <h2 className="headline text-danger">500</h2>

          <div className="error-content">
            <h3><i className="fas fa-exclamation-triangle text-danger"></i> Oops!
              Sorry, something went wrong.
            </h3>
            <p><i>{/*error.statusText || error.message*/}ERROR</i></p>
            <p>
              We will work on fixing that right away.
              Meanwhile, you may <Link to="/">return to Home</Link> or try using the search form.
            </p>

            <form className="search-form">
              <div className="input-group">
                <input type="text" name="search" className="form-control" placeholder="Search" />

                <div className="input-group-append">
                  <button type="submit" name="submit" className="btn btn-danger"><i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}