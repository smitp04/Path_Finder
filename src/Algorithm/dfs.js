
export const dfs=(visitCtx,gridCtx,speed)=>{
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
            
            if(curr[0] === cor.start.x && curr[1] === cor.start.y){ 
                visitCtx.setVisited(curr[0],curr[1],-1);
                clearInterval(timer);
                return;
            }
            visitCtx.setVisited(curr[0],curr[1],-4);
            curr=parent[curr[0]][curr[1]];
        },speed);
    }

    function mark(curr){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                visitCtx.setVisited(curr[0],curr[1],-3);                            
                resolve(true);
            },speed);
        });
    }
    const executedfs=async()=>{
        let stack=[];
        stack.unshift([cor.start.x,cor.start.y]);
        while (stack.length) {
            const curr = stack.shift();
            const dir=[[-1,0],[1,0],[0,-1],[0,1]];
            for(let j=0; j<4; j++){
                let ni=curr[0]+dir[j][0],nj=curr[1]+dir[j][1];
                
                if(isInRange({ni,nj})){
                    if(visitCtx.visited[ni][nj] == -1 && ni != cor.start.x && nj != cor.start.y){
                        parent[ni][nj]=[curr[0],curr[1]];
                        printPath();
                        return;
                    }else if(visitCtx.visited[ni][nj]>=0){
                        parent[ni][nj]=[curr[0],curr[1]];
                        await mark([ni, nj]);
                        stack.unshift([ni, nj]);
                    }
                }
            }
        }
    }
    executedfs();
}

