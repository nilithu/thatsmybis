<div class="pr-2 pl-2">
    <ul class="list-inline mb-0">
        <li class="list-inline-item">
            <label for="raid_filter font-weight-light">
                <span class="text-muted fas fa-fw fa-users-crown"></span>
                Raid
            </label>
            <select id="raid_filter" class="form-control">
                <option value="" class="bg-tag">—</option>
                @foreach ($raids as $raid)
                    <option value="{{ $raid->name }}" class="bg-tag" style="color:{{ $raid->getColor() }};">
                        {{ $raid->name }}
                    </option>
                @endforeach
            </select>
        </li>

        <li class="list-inline-item font-weight-light">
            <span class="text-muted fas fa-fw fa-eye-slash"></span>
            Columns
        </li>
        <li class="list-inline-item">&sdot;</li>
        <li class="list-inline-item">
            <a class="toggle-column cursor-pointer font-weight-light" data-column="1" href="">
                <span class="text-muted fas fa-fw fa-scroll-old"></span>
                Wishlist
            </a>
        </li>
        <li class="list-inline-item">&sdot;</li>
        <li class="list-inline-item">
            <a class="toggle-column cursor-pointer font-weight-light" data-column="2" href="">
                <span class="text-muted fas fa-fw fa-comment-alt-lines"></span>
                Notes
            </a>
        </li>
        <li class="list-inline-item">&sdot;</li>
        <li class="list-inline-item">
            <a class="toggle-column cursor-pointer font-weight-light" data-column="3" href="">
                <span class="text-muted fas fa-fw fa-comment-alt-lines"></span>
                Priority
            </a>
        </li>
    </ul>
</div>

<div class="col-12 pb-3 pr-2 pl-2 rounded">
    <table id="itemTable" class="col-xs-12 table table-border table-hover stripe">
    </table>
</div>