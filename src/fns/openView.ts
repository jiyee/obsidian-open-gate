import { Workspace, WorkspaceLeaf } from 'obsidian'

export const openView = async (workspace: Workspace, id: string, position?: GateFrameOptionType): Promise<WorkspaceLeaf> => {
    let leaf: WorkspaceLeaf
    let leafs = workspace.getLeavesOfType(id)
    if (leafs.length > 0) {
        workspace.revealLeaf(leafs[0])
        workspace.setActiveLeaf(leafs[0], {focus: true})
        return leafs[0]
    }

    leaf = await createView(workspace, id, position)
    workspace.revealLeaf(leaf)
    workspace.setActiveLeaf(leaf, {focus: true})

    return leaf
}

export const isViewExist = (workspace: Workspace, id: string): boolean => {
    let leafs = workspace.getLeavesOfType(id)
    return leafs.length > 0
}

const createView = async (workspace: Workspace, id: string, position?: GateFrameOptionType) => {
    let leaf: WorkspaceLeaf | undefined
    switch (position) {
        case 'left':
            leaf = workspace.getLeftLeaf(false)
            break
        case 'center':
            leaf = workspace.getLeaf(true)
            break
        case 'right':
        default:
            leaf = workspace.getRightLeaf(false)
            break
    }

    await leaf?.setViewState({ type: id, active: true })
    return leaf
}
