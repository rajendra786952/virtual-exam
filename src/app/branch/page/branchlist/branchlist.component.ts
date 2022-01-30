import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BranchService } from 'app/shared/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { BranchViewComponent } from '../branch-view/branch-view.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-branchlist',
  templateUrl: './branchlist.component.html',
  styleUrls: ['./branchlist.component.scss']
})
export class BranchlistComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['s_no', 'branch_name', 'details', 'Action']
  dataSource = new MatTableDataSource<any>();
  paginator: any;
  sort: any;
  constructor(private router: Router, private branchService: BranchService,
    private cdRef: ChangeDetectorRef, private dialog: MatDialog, private toster: ToastrService) { }

  ngOnInit(): void {
    this.getBranch();
  }
  newBranch() {
    this.router.navigate(['/branch/new']);
  }
  edit(data){
    sessionStorage.setItem('edit-branch',JSON.stringify(data));
    this.router.navigate(['/branch/edit']);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getBranch() {
    this.branchService.getAllBranch().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.dataSource = res.response;
        this.cdRef.detectChanges();
      }
    },
      error => {
        console.log(error);
      })
  }
  view(data) {
    const dialogRef = this.dialog.open(BranchViewComponent, { data: data, width: '600px' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delete(i) {
    console.log(i);
    swal.fire({
      title: 'Branch and Subject will be permanently deleted',
      allowOutsideClick: false,
      buttonsStyling: false,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn btn-danger ml-3',
        cancelButton: 'btn btn-primary'
      },
    }).then((result) => {
      if (result.value) {
        this.branchService.deletebranch(i).subscribe((res: any) => {
          if (res) {
            this.getBranch();
            this.toster.success('', res.response, {
              positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
            });
          }
        },
          error => {
            console.log(error);
          });
      }
    })
  }

}
