
export const bfs=(visitCtx,gridCtx,speed)=>{
    const cor=gridCtx.cor; //terminal cordinate;
    const noRows=gridCtx.noRows.rows;       //total no of rows and cols;
    const noCols=gridCtx.noCols.cols;
    

    let parent = (new Array(noRows)).fill().map(function(){ return new Array(noCols).fill([-1,-1]);});  
    
    const isInRange=(curr)=>{         
            return curr.ni>=0 && curr.nj>=0 && curr.ni<noRows && curr.nj<noCols;
    }

    const printPath=()=>{
        let curr=parent[cor.end.x][cor.end.y]; 

        var timer=setInterval(()=>{
            if(curr[0]==cor.start.x && curr[1]==cor.start.y){ 
                visitCtx.setVisited(curr[0],curr[1],-1);
                clearInterval(timer);
                return;
            }
            visitCtx.setVisited(curr[0],curr[1],-4);
            curr=parent[curr[0]][curr[1]];
        },speed);
    }

    function relax(queue){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                const curr=queue.shift();
                const dir=[[-1,0],[1,0],[0,-1],[0,1]];

                for(let j=0;j<4;j++){
                    let ni=curr[0]+dir[j][0],nj=curr[1]+dir[j][1];
                    if(isInRange({ni,nj})){
                        if(visitCtx.visited[ni][nj]==-1 && ni!=cor.start.x && nj!=cor.start.y){
                            parent[ni][nj]=[curr[0],curr[1]];

                            reject(true);
                            return;
                        }else if(visitCtx.weight[ni][nj] !== 1000000 && visitCtx.visited[ni][nj]>=0){
                            parent[ni][nj]=[curr[0],curr[1]];
                            queue.push([ni,nj]);
                            visitCtx.setVisited(ni,nj,-3);                            
                        }
                    }
                }
                resolve(true);
            },speed);
        });
    }
    const executeBFS=async()=>{
        let queue=[];
        queue.push([cor.start.x,cor.start.y]);

        while(queue.length){
            let n=queue.length;

            
            for(let i=0;i<n;i++){
                try{
                    const y=await relax(queue);
                }
                catch(err){
                    printPath();
                    return;
                }

            }
           
        }
    }

    executeBFS();
}

