export const Sidebar = () => {
  return (
    <div className="w-64 border-r border-border bg-muted p-4">
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">Workspaces</h2>
          <div className="space-y-1">
            <div className="px-2 py-1.5 text-sm rounded hover:bg-background cursor-pointer">
              General
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">Channels</h2>
          <div className="space-y-1">
            <div className="px-2 py-1.5 text-sm rounded hover:bg-background cursor-pointer">
              # general
            </div>
            <div className="px-2 py-1.5 text-sm rounded hover:bg-background cursor-pointer">
              # random
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
