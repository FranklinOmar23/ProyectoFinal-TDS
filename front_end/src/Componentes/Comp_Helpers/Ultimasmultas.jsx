import React from "react";

function Ultimamult () {

    return(
        <>
        <div id="content">
            <div id="multas">
                <h3 class="fw-bold text-dark mb-4">TUS ULTIMAS MULTAS</h3>
                <div
                  class="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th class="fw-semibold" style={{color: 'white'}}>
                          MOTIVO
                        </th>
                        <th class="fw-semibold" style={{color: 'white'}}>
                          DEUDA A PAGAR
                        </th>
                        <th class="fw-semibold" style={{color: 'white'}}>
                          ESTADO
                        </th>
                        <th class="fw-semibold" style={{color: 'white'}}>
                          ACCION
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <nav class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" aria-label="Previous" href="#"><span aria-hidden="true">«</span></a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" aria-label="Next" href="#"><span aria-hidden="true">»</span></a>
                  </li>
                </ul>
              </nav>
              </div>
        
        </>
    )
}

export default Ultimamult;